import json
import os
import uuid
import base64
import urllib.request
import urllib.error


ALLOWED_TARIFFS = {
    'HERO': 20, 'TITAN': 30, 'AVENGER': 70, 'OVERLORD': 120,
    'IMPERATOR': 220, 'DRAGON': 330, 'D.HELPER': 500, 'GOD': 1000,
}


def handler(event: dict, context) -> dict:
    '''
    Создаёт платёж в ЮKassa для покупки донат-привилегии.
    Принимает: tariff (название привилегии), nickname (игровой ник).
    Возвращает: confirmation_url для перенаправления игрока на оплату.
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    tariff = str(body.get('tariff', '')).strip()
    nickname = str(body.get('nickname', '')).strip()
    return_url = str(body.get('returnUrl', '')).strip() or 'https://example.com'

    if tariff not in ALLOWED_TARIFFS:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Неизвестный тариф'})}

    if not nickname or len(nickname) < 3 or len(nickname) > 16:
        return {'statusCode': 400, 'headers': cors,
                'body': json.dumps({'error': 'Введите корректный игровой ник (3-16 символов)'})}

    amount = ALLOWED_TARIFFS[tariff]

    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    if not shop_id or not secret_key:
        return {'statusCode': 500, 'headers': cors,
                'body': json.dumps({'error': 'Платёжная система не настроена'})}

    payload = {
        'amount': {'value': f'{amount}.00', 'currency': 'RUB'},
        'capture': True,
        'confirmation': {'type': 'redirect', 'return_url': return_url},
        'description': f'Привилегия {tariff} для игрока {nickname}',
        'metadata': {'tariff': tariff, 'nickname': nickname},
    }

    auth = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()
    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payload).encode(),
        headers={
            'Authorization': f'Basic {auth}',
            'Idempotence-Key': str(uuid.uuid4()),
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        return {'statusCode': 502, 'headers': cors,
                'body': json.dumps({'error': 'Ошибка платёжной системы', 'details': e.read().decode()[:300]})}

    confirmation_url = data.get('confirmation', {}).get('confirmation_url')
    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'paymentId': data.get('id'),
            'status': data.get('status'),
            'confirmationUrl': confirmation_url,
        }),
        'isBase64Encoded': False,
    }
