const nodemailer = require('nodemailer')

   module.exports =verificarMail = async (correo, nombreCompleto, codigo) => {

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
        subject: 'Verifica tu cuenta Jobbook',
        text: `verifica tu cuenta de correo electronico`,
        html:`<p style="text-align: center; color:#364f6b; font-size:28px"><strong>Bievenido a la familia Jobbook</strong></p>
        <p style="text-align: center; color:#364f6b; font-size:18px"><strong>${nombreCompleto} verifica tu cuenta de correo con el siguiente codigo:</strong></p>
        <p style="text-align: center; color:#5b81ac; font-size:40px"><strong>${codigo}</strong></p>`

    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    console.log(info)
    console.log(codigo)

    }