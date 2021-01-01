const { Model, DataTypes } = require('sequelize');

class Imagem_produto extends Model{
  static init(sequelize){
    super.init({
      id_produto: DataTypes.INTEGER,
      principal: DataTypes.BOOLEAN,
      nome: DataTypes.STRING(50),
      nome_arquivo: DataTypes.STRING(100)

    }, {
      sequelize,
      modelName: 'Imagem_produto',
    })
  }
  static associate(models){
    this.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'imagem_do_produto'});
  }
}

module.exports = Imagem_produto;