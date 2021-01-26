<template>
  <div id="app">
    <div class="container h-100">
      <div class="row justify-content-center align-content-center h-75">
        <div class="col-lg-7 col-12">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputZip">CEP</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="inputZip"
                    v-model="zip"
                    :disabled="loadingZip"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">
                      <i class="fas fa-spinner fa-spin" v-if="loadingZip"></i>
                      <i class="fas fa-search" v-else></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-6">
                <label for="inputState">Estado</label>
                <select
                  id="inputState"
                  class="form-control"
                  :disabled="loadingZip"
                  v-model="uf"
                >
                  <option value="" selected disabled>Selecione o estado</option>
                  <option :value="uf" :key="uf" v-for="uf in ufList">
                    {{ uf }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="inputAddress">Endereço</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Rua/Av..."
                  v-model="address"
                  :disabled="loadingZip"
                />
              </div>
              <div class="form-group col-md-5">
                <label for="inputDistrict">Bairro</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputDistrict"
                  placeholder="Bairro"
                  v-model="district"
                  :disabled="loadingZip"
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputNumber">Número</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputNumber"
                  :disabled="loadingZip"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputAdress2">Complemento</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAdress2"
                  :disabled="loadingZip"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputCity">Cidade</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  v-model="city"
                  :disabled="loadingZip"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuscaCep from "@/mixins/buscaCep.js";

export default {
  mixins: [BuscaCep],
  data() {
    return {
      ufList: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
      ],
      uf: "",
      zip: "",
      city: "",
      address: "",
      district: "",
      loadingZip: false
    };
  },
  watch: {
    zip(value) {
      if (value.length === 8) {
        this.loadingZip = true;

        this.buscaCep(value)
          .then(data => {
            this.uf = data.uf;
            this.city = data.city;
            this.address = data.address;
            this.district = data.district;
          })
          .catch(message => console.log(message))
          .then(() => (this.loadingZip = false));
      }
    }
  }
};
</script>

<style>
html,
body,
div#app {
  height: 100%;
}
</style>
