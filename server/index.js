const { sequelize } = require('./config/config');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/review', reviewRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running!'
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 3000;

try {
    sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
} catch (error) {
    console.log(error);
}
