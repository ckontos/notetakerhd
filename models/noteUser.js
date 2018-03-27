var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = function(sequelize, DataTypes) {
    var noteUser = sequelize.define("noteUser", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        email: {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            len: [1]
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });
    noteUser.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // before we create the user encrypt the password
    noteUser.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    noteUser.associate = function(models) {
        // Associating the user with their saved entries
        noteUser.hasMany(models.Entry, {
            onDelete: "cascade"
        });
    };
    return noteUser;
};
