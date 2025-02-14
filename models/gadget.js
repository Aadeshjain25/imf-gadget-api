const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Gadget = sequelize.define("Gadget", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    type: {
        type: DataTypes.ENUM("Basic", "Advanced", "Prototype"),
        defaultValue: "Basic"
    },
    status: {
        type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
        defaultValue: "Available"
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    decommissionedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = Gadget;