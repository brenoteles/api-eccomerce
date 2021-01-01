const { Model, DataTypes } = require('sequelize');
 
class Item_pedido extends Model{
  static init(sequelize){
    super.init({
      id_pedido: DataTypes.INTEGER,
      id_produto: DataTypes.INTEGER,
      preço_unitário: DataTypes.DOUBLE,
      quantidade: DataTypes.INTEGER      

    }, {
      sequelize,
      modelName: 'Item_pedido',
    })
  }
  static associate(models){
    this.belongsTo(models.Pedido, { foreignKey: 'id_pedido', as: 'pedido'});
    this.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'produto'});   
  }
}

module.exports = Item_pedido;

