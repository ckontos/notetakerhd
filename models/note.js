module.exports = function(sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });

    Note.associate = function(models) {
        Note.belongsTo(models.Entry, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Note;
};
