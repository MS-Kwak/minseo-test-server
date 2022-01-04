function modeling(sequelize, DataTypes) {
    const puppy = sequelize.define('PuppyDB', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        seller: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    });
    return puppy;
}

module.exports = modeling;
