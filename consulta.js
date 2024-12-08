const models = require('./models');
async function consulta() {   
    const tags = await models.Tag.findAll();
    tags.forEach(tag =>{
        console.log(tag.dataValues);
    });
    const activos = await models.Activo.findAll();
    activos.forEach(activo =>{
        console.log(activo.dataValues);
    });
    const ubicaciones = await models.Ubicacion.findAll();
    ubicaciones.forEach(ubicacion =>{
        console.log(ubicacion.dataValues);
    });

    const t = await models.Activo.findByPk(1);
    const ta = await models.Tag.findByPk(1);
    await t.addTag(ta);

    models.sequelize.close();
}
consulta();