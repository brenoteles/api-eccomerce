const { Model, DataTypes } = require('sequelize');

class Pedido extends Model{
  static init(sequelize){
    super.init({
      id_cliente: DataTypes.INTEGER,
      total: DataTypes.DOUBLE,
      status: DataTypes.INTEGER,
      cep: DataTypes.STRING(14),
      numero: DataTypes.INTEGER,
      complemento: DataTypes.STRING(1000)
    }, {
      sequelize,
      modelName: 'Pedido',
    })
  }
  static associate(models){
    this.belongsTo(models.Usuário, { foreignKey: 'id_cliente', as: 'usuário' });
    this.hasMany(models.Item_pedido, { foreignKey: 'id_pedido', as: 'item-pedido' });
  }
}

module.exports = Pedido;