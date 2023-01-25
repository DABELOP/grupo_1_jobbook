const nodemailer = require('nodemailer')

   module.exports =verificarMail = async (correo, nombreCompleto, codigo) => {
    console.log('ENTRO')
    const config ={
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'dtresoluciones@gmail.com',
            pass: 'xooftlvgmdilpoum'
        }    
    }

    const mensaje={
        from: 'Equipo Jobbook',
        to: correo,
        subject: 'Correo de prueba',
        text: `${nombreCompleto} verifica tu cuenta de correo electronico`,
        html:`<p>Bienvenido a la familia Jobbook</p>
        <p>Verfica tu cuenta con el siguiente codigo:</p>
        <p>${codigo}<p/>`

    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    console.log(info)

    }