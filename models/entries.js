module.exports = function(sequelize, DataTypes) {
    var Entry = sequelize.define("Entry", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Entry.associate = function(models) {

        Entry.belongsTo(models.noteUser, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Entry.associate = function(models) {
        Entry.hasMany(models.Note, {
            onDelete: "cascade"
        });
    };

    return Entry;
};
