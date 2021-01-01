const { Model, DataTypes } = require('sequelize');

class Usuário extends Model{
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING(45),
      email: DataTypes.STRING(45),
      senha: DataTypes.STRING(500),
      tipo_usuario: DataTypes.INTEGER,
      cpf: DataTypes.STRING(14),
      cep: DataTypes.STRING(10),
      numero: DataTypes.INTEGER,
      complemento: DataTypes.STRING(45),
      compras_feitas: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Usuário',
    })
  }
  static associate(models){
    this.hasMany(models.Pedido, { foreignKey: 'id_cliente', as: 'pedidos'});
  }
}

module.exports = Usuário;