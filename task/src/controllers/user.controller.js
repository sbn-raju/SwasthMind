export const loginUser = async (req, res) => {

    const validationRules = [
        body('username',"Username cannot be empty").notEmpty().isString().escape(),
        body('password').notEmpty().isString(),
    ];

    await Promise.all(validationRules.map(validation => validation.run(req)))

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const { username, password } = req.body

    try {
        const userQuery = 'SELECT * FROM Users WHERE username = $1'
        const userValues = [username]
        const userResult = await pool.query(userQuery, userValues)
        const user = userResult.rows[0]

        if (!user) {
            return res.status(401).json({
                 message: 'User not exists' 
                })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Wrong Password' 
            })
        }
        const userData = {
            user: {
                userId: user.user_id,
                username: user.username,
                role_id: user.role_id
            }
        }

        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '3d' })

        res.status(200).json({
            message: 'Login successful',
            token: token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}


