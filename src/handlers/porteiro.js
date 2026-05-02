const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

const params = {
    InstanceIds: ["i-03d8f71e89ef23c05"]
};

// Função para iniciar a instância EC2
exports.startEC2Instance = async () => {
    try {
        const data = await ec2.startInstances(params).promise();

        console.log("Porteiro ligado com sucesso", data);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "EC2 iniciada com sucesso",
                instances: data.StartingInstances
            })
        };

    } catch (err) {
        console.error("Erro", err);

        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
};

// Função para parar a instância EC2
exports.stopEC2Instance = async () => {
    try {
        const data = await ec2.stopInstances(params).promise();

        console.log("Porteiro desligado com sucesso", data);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "EC2 parada com sucesso",
                instances: data.StoppingInstances
            })
        };

    } catch (err) {
        console.error("Erro", err);

        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
};