const { Model, DataTypes } = require('sequelize');

class Produto extends Model{
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING(45),
      qtd_estoque: DataTypes.INTEGER,
      preço_custo: DataTypes.DOUBLE,
      preço_venda: DataTypes.DOUBLE,
      descrição: DataTypes.STRING(1000)
    }, {
      sequelize,
      modelName: 'Produto',
    })
  }
  static associate(models){
    this.hasMany(models.Item_pedido, { foreignKey: 'id_produto', as: 'item_pedido'});
    this.hasMany(models.Imagem_produto, { foreignKey: 'id_produto', as: 'produto_da_imagem'});
  }
}

module.exports = Produto;