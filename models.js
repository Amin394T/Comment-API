import { Sequelize } from "@sequelize/core";
import { DataTypes } from "@sequelize/core";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


export const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("active", "blocked"),
      defaultValue: "active",
    }
  },
  {
    timestamps: false,
  }
);


export const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("normal", "removed"),
      defaultValue: "normal",
    }
  },
  {
    timestamps: false,
  }
);