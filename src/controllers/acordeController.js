const { Op } = require("sequelize");
const acordeModel = require("../models/acorde");
const acordesViolaoModel = require("../models/acordeViolao");

module.exports = {
    list: async function (req, res) {
        try {
            let nome = req.query.nome;

            let buscas = await acordesViolaoModel.findAll({
                where: { acordeNome: nome }
            });

            if (buscas.length > 0) {

                let resultados = buscas.map(b => {
                    let formato = b.formato;
                    if (typeof formato === "string") {
                        formato = formato.trim().split('-');
                    }

                    formato = formato.map(n => n.trim());
                    while (formato.length < 6) {
                        formato.push("x");
                    }

                    formato = formato.slice(0, 6);

                    return formato;
                });

                return res.send({ listasDeNotas: resultados });

            } else {
                return res.status(404).send({ erro: "Nenhum formato encontrado" });
            }

        } catch (error) {
            return res.status(500).send(error);
        }
    }
};