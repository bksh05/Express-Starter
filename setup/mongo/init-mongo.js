db.createUser(
    {
        user: 'express-starter-user',
        pwd: 'password123',
        roles: [
            {
                role: 'readWrite',
                db: 'express-starter-db'
            }
        ]

    }
)