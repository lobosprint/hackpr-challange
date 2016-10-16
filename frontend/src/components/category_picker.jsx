const React = require('react');


const objsToPick = ['T-Bone Steak','Carne molida','Salchicha','Pollo para freír','Trozos de atún claro enlatado','Leche entera','Huevos','Margarina','Queso parmesano','Papas','Guineos','Lechuga','Pan especial','Jugo de china','Café','Azúcar','Cereal de hojuelas de maíz','Guisantes verdes','Melocotón','Toallas faciales','Detergente de lavaplatos','Aceite de canola','Comida congelada','Maíz tierno entero congelado','Papas fritas','Refresco','Alquiler apartamento','Precio de vivienda','Energía total','Teléfono','Balanceo de gomas','Gasolina','Visita a un optómetra','Visita a un doctor','Visita a un dentista','Ibuprofén','Lipitor','Hamburger','Pizza','Pollo frito','Recorte de pelo de caballero','Salón de belleza (Recorte para dama con lavado y secado','Pasta dental','Champú','Lavado en seco','Camisa de vestir de hombre','Mahones de niño','Pantalón de mujer','Reparación de electrodoméstico','Periódico','Película','Bowling','Bolas de tenis','Servicios veterinaries','Cerveza','Vino'];


const Picker = React.createClass({
  getInitialState() {
    return {
      selectedItems: objsToPick.slice(),
      deSelectedItems: []
    };
  },
  makeLiList(list = [], addedList = true) {
    return list.map((item, idx)=> {
      const clickFunc = addedList ? this.makeRemoveHandler(idx) : this.makeAddHandler(idx);
      const classes = 'btn btn-' + (addedList ? 'success' : 'danger');
      return <div className={classes} onClick={clickFunc} key={idx}>{item}</div>;
    });
  },
  render() {
    return (
      <div className="well">
        <div className="row">
          <div className="panel-success panel">
            <div className="panel-heading">
              Elementos utilizados
              <span className="btn btn-xs pull-right element-action">
                Utilizar todo
              </span>
              <span className="btn btn-xs pull-right element-action">
                No utilizar nada
              </span>
            </div>
            <div className="panel-body">
              <div>{this.makeLiList(this.state.selectedItems)}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="panel-danger panel">
            <div className="panel-heading">
              Elementos no utilizados
              <span className="btn btn-xs pull-right element-action">
                Utilizar todo
              </span>
              <span className="btn btn-xs pull-right element-action">
                No utilizar nada
              </span>
            </div>
            <div className="panel-body">
              <div>{this.makeLiList(this.state.deSelectedItems, false)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  makeRemoveHandler(idx) {
    const that = this;
    return function(evt) {
      const oldListCopy = that.state.selectedItems.slice();
      const itemToMove = oldListCopy.splice(idx, 1);
      const newList = that.state.deSelectedItems.slice(0);
      newList.push(itemToMove);
      that.setState({
        deSelectedItems: newList,
        selectedItems: oldListCopy
      });
    }
  },
  makeAddHandler(idx) {
    const that = this;
    return function(evt) {
      const oldListCopy = that.state.deSelectedItems;
      const itemToMove = oldListCopy.splice(idx, 1);
      const newList = that.state.selectedItems.slice(0);
      newList.push(itemToMove);
      that.setState({
        selectedItems: newList,
        deSelectedItems: oldListCopy
      });
    };
  }
});


module.exports = Picker;
