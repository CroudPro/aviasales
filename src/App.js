import "./App.scss";
import logo from "./assets/logo.svg";

function App() {
  return (
      <div className="wrapper">
        <img src={logo} alt="Logo" />

          <div className="app">
              <div className="app__left">
                  <div className="filter">
                      <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
                      <ul>
                          <li>
                              <input type="checkbox" id="filter__input1"/>
                              <label htmlFor="filter__input1"/>
                              <p>Все</p>
                          </li>
                          <li>
                              <input type="checkbox" id="filter__input2"/>
                              <label htmlFor="filter__input2"/>
                              <p>Без пересадок</p>
                          </li>
                          <li>
                              <input type="checkbox" id="filter__input3"/>
                              <label htmlFor="filter__input3"/>
                              <p>1 пересадка</p>
                          </li>
                          <li>
                              <input type="checkbox" id="filter__input4"/>
                              <label htmlFor="filter__input4"/>
                              <p>2 пересадки</p>
                          </li>
                          <li>
                              <input type="checkbox" id="filter__input5"/>
                              <label htmlFor="filter__input5"/>
                              <p>3 пересадки</p>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="app__right">
                  <div className="app__sort">
                      <button className="app__sort-selected">САМЫЙ ДЕШЕВЫЙ</button>
                      <button>САМЫЙ БЫСТРЫЙ</button>
                      <button>ОПТИМАЛЬНЫЙ</button>
                  </div>
                  <div className="tickets">
                      <div className="tickets__item">
                        <div className="tickets__header">
                            <p>13 400 Р</p>
                            <img src="http://pics.avs.io/99/36/4a.png" alt=""/>
                        </div>
                          <div className="tickets__content">
                              <div className="tickets__segment">
                                  <div className="tickets__route">
                                      <div className="tickets__segment-header">MOV-HKT</div>
                                      <div className="tickets__segment-content">10:45 - 08:00</div>

                                  </div>
                                  <div className="tickets__time">
                                      <div className="tickets__segment-header">В ПУТИ</div>
                                      <div className="tickets__segment-content">21:15</div>
                                  </div>
                                  <div className="tickets__stop">
                                      <div className="tickets__segment-header">2 ПЕРЕСАДКИ</div>
                                      <div className="tickets__segment-content">HKG, JNB</div>
                                  </div>
                              </div>
                              <div className="tickets__segment">
                                  <div className="tickets__route">
                                      <div className="tickets__segment-header">MOV-HKT</div>
                                      <div className="tickets__segment-content">10:45 - 08:00</div>

                                  </div>
                                  <div className="tickets__time">
                                      <div className="tickets__segment-header">В ПУТИ</div>
                                      <div className="tickets__segment-content">21:15</div>
                                  </div>
                                  <div className="tickets__stop">
                                      <div className="tickets__segment-header">2 ПЕРЕСАДКИ</div>
                                      <div className="tickets__segment-content">HKG, JNB</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
  );
}

export default App;
