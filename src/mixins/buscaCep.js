import axios from "axios";

export default {
  methods: {
    buscaCep(cep) {
      // Lista de servidores, no qual a ordem é a prioridade
      const servers = [
        `https://viacep.com.br/ws/${cep}/json`,
        `https://ws.apicep.com/cep/${cep}.json`,
        `https://brasilapi.com.br/api/cep/v1/${cep}`
      ];

      return new Promise((resolve, reject) => {
        if (cep.length !== 8) reject("Cep inválido");

        const busca = server =>
          axios
            .get(servers[server]) // Busca no servidor solicitado
            .then(({ data }) =>
              resolve({
                uf: data.state || data.uf,
                city: data.city || data.localidade,
                address: data.street || data.address || data.logradouro,
                district: data.neighborhood || data.district || data.bairro
              })
            )
            // Em caso de erro executa a função de busca novamente se houverem outros servidores disponíveis
            .catch(() =>
              servers[server + 1] ? busca(server + 1) : reject("Sem resposta")
            );

        busca(0);
      });
    }
  }
};
