const bcrypt = require('bcryptjs');

const Socio = require("../models/socio");

const sociosGet = async (req, res) => {
 
  const socios = await Socio.find(); //{estado:true} Lo saque para que traiga todos los socios hasta los inactivos
  const total = await Socio.countDocuments()
  res.json({
    total,
   socios,
    
  });
};
const sociosPost = async (req, res) => {
  const {
    email,
    trabajadornombre,
    trabajadorapellido,
    trabajadornacionalidad,
    trabajadorestadocivil,
    trabajadorsexo,
    trabajadornacimiento,
    trabajadordocumento,
    trabajadorcuil,
    trabajadordomicilio,
    trabajadornumdomicilio,
    trabajadorpiso,
    trabajadordepto,
    trabajadorlocalidad,
    trabajadorprovincia,
    trabajadorlugardetrabajo,
    trabajadortareas,
    trabajadortel,
    trabajadorcel,
    empleadorcuil,
    empleadorrazonsocial,
    empleadordomicilio,
    empleadorlocalidad,
    empleadorprovincia,
    empleadortrabajodomicilio,
    empleadortrabajolocalidad,
    empleadortrabajoprovincia,
    empleadoractividad,
   password,
   role,
    img,
 
  } = req.body;

  const socio = new Socio({
    email,
    trabajadornombre,
    trabajadorapellido,
    trabajadornacionalidad,
    trabajadorestadocivil,
    trabajadorsexo,
    trabajadornacimiento,
    trabajadordocumento,
    trabajadorcuil,
    trabajadordomicilio,
    trabajadornumdomicilio,
    trabajadorpiso,
    trabajadordepto,
    trabajadorlocalidad,
    trabajadorprovincia,
    trabajadorlugardetrabajo,
    trabajadortareas,
    trabajadortel,
    trabajadorcel,
    empleadorcuil,
    empleadorrazonsocial,
    empleadordomicilio,
    empleadorlocalidad,
    empleadorprovincia,
    empleadortrabajodomicilio,
    empleadortrabajolocalidad,
    empleadortrabajoprovincia,
    empleadoractividad,
    password,
    role,
    img,
  
  });

  const salt = bcrypt.genSaltSync();
  socio.password = bcrypt.hashSync(password, salt);

  await socio.save();
 res.status(201).json({
    msg:"Socio creado con exito!",
    socio,
  });
};
const sociosPut =async(req, res) => {
  const { id } = req.params;
  const {_id,password, email,...restos} = req.body;
  if(password){
    const salt = bcrypt.genSaltSync();
    restos.password = bcrypt.hashSync(password, salt);
  }
  
  const socio = await Socio.findByIdAndUpdate(id,restos,{new:true})
  res.status(201).json({
    msg: "Socio Actualizado",
    socio,
  });
};
const sociosDelete = async(req, res) => {
  const { id } = req.params;
  const socioBorrado = await Socio.findByIdAndUpdate(id,{estado:false},{new:true})
  res.json({
    msg: "Socio dado de baja  correctamente",
    socioBorrado
  });
 
};

module.exports = {
  sociosGet,
  sociosPost,
  sociosPut,
  sociosDelete,
};
