import React, { Component } from "react";
import TitleBlock from "./titleBlock";
import Character from "../models/character";
import { HashRouter, Link } from "react-router-dom";
class Characters extends Component {
  //TODO: implement props.newPlayer

  constructor(props) {
    super();
    if (props.newPlayer.Stats == null) this.resetNewPlayer(props);
  }
  getNewStats() {
    return [
      { id: 1, type: "core", stat: "Edge", value: 0 },
      { id: 2, type: "core", stat: "Heart", value: 0 },
      { id: 3, type: "core", stat: "Iron", value: 0 },
      { id: 4, type: "core", stat: "Shadow", value: 0 },
      { id: 5, type: "core", stat: "Wits", value: 0 },
      { id: 6, type: "status", stat: "Health", value: 5 },
      { id: 7, type: "status", stat: "Spirit", value: 5 },
      { id: 8, type: "status", stat: "Supply", value: 5 },
      { id: 9, type: "status", stat: "Momentum", value: 2 },
    ];
  }

  handleAddCharacter = () => {
    const players = this.props.players;
    const player = new Character();
    player.name = this.props.newPlayer.Name;
    player.role = this.props.newPlayer.Role;
    player.goal = this.props.newPlayer.Goal;
    player.descriptor = this.props.newPlayer.Descriptor;
    player.stats = this.props.newPlayer.Stats;
    if (
      this.props.newPlayer.Name != "" &&
      !players.find((p) => p.name == this.props.newPlayer.Name)
    ) {
      players.push(player);
      this.setState({ players: players });
      this.resetNewPlayer();
    }
  };

  resetNewPlayer(props = null) {
    const newPlayer = props !== null ? props.newPlayer : this.props.newPlayer;
    newPlayer.Name = "";
    newPlayer.Role = "";
    newPlayer.Goal = "";
    newPlayer.Descriptor = "";
    newPlayer.Stats = this.getNewStats();
    this.setState({ newPlayer });
  }

  handlePlayerDelete = (playerName) => {
    const players = this.props.players;
    let pos = -1;
    for (let i = 0; i < players.length; i++) {
      let p = players[i];
      if (p.name === playerName) {
        pos = i;
      }
    }

    if (pos != -1) players.splice(pos, 1);

    this.setState({ players: players });
  };

  handleOnRollPlayerName = () => {
    const newPlayer = this.props.newPlayer;
    let rn = this.props.oracles.IronlanderName;
    newPlayer.Name = rn;
    this.setState({ newPlayer });
  };

  handleNewPlayerNameChanged = (evt) => {
    const newPlayer = this.props.newPlayer;
    newPlayer.Name = evt.target.value;
    this.setState({ newPlayer });
  };

  handleOnRollPlayerRole = () => {
    const newPlayer = this.props.newPlayer;
    let rn = this.props.oracles.CharacterRole;
    newPlayer.Role = rn;
    this.setState({ newPlayer });
  };

  handleNewPlayerRoleChanged = (evt) => {
    const newPlayer = this.props.newPlayer;
    newPlayer.Role = evt.target.value;
    this.setState({ newPlayer });
  };

  handleOnRollPlayerGoal = () => {
    const newPlayer = this.props.newPlayer;
    let rn = this.props.oracles.CharacterGoal;
    newPlayer.Goal = rn;
    this.setState({ newPlayer });
  };

  handleNewPlayerGoalChanged = (evt) => {
    const newPlayer = this.props.newPlayer;
    newPlayer.Goal = evt.target.value;
    this.setState({ newPlayer });
  };

  handleOnRollPlayerDescriptor = () => {
    const newPlayer = this.props.newPlayer;
    let rn = this.props.oracles.CharacterDescriptor;
    newPlayer.Descriptor = rn;
    this.setState({ newPlayer });
  };

  handleNewPlayerDescriptorChanged = (evt) => {
    const newPlayer = this.props.newPlayer;
    newPlayer.Descriptor = evt.target.value;
    this.setState({ newPlayer });
  };

  handleOnRollPlayerPrimaryStat = () => {
    let rn = this.props.oracles.PrimaryStat;
    const newPlayerStats = this.props.newPlayer.Stats.map((s) => {
      if (s.type == "core") s.value = s.id == rn ? 3 : "";
      return s;
    });
    this.setState({ newPlayerStats });
  };

  handleNewPlayerStatChanged = (evt) => {
    let statName = evt.target.getAttribute("data-name");
    const newPlayerStats = this.props.newPlayer.Stats.map((s) => {
      if (s.stat == statName) s.value = evt.target.value;
      return s;
    });
    this.setState({ newPlayerStats });
  };

  getSelectedPlayer() {
    return this.props.players.find((p) => p.selected);
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.handleOnRollPlayerName()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Name"
                    aria-label="Name"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayer.Name}
                    onChange={(e) => this.handleNewPlayerNameChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.handleOnRollPlayerGoal()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Goal"
                    aria-label="Character Goal"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayer.Goal}
                    onChange={(e) => this.handleNewPlayerGoalChanged(e)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.handleOnRollPlayerRole()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Role"
                    aria-label="Character Role"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayer.Role}
                    onChange={(e) => this.handleNewPlayerRoleChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.handleOnRollPlayerDescriptor()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Descriptor"
                    aria-label="Character Descriptor"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayer.Descriptor}
                    onChange={(e) => this.handleNewPlayerDescriptorChanged(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="alert alert-secondary">
                  There are five stats in total. Each is given a value from 1 to
                  3. To start, arrange these bonuses across your five stats in
                  any order: <b>3, 2, 2, 1, 1.</b> You can also roll on the
                  oracle to leave your primary stat choice down to fate.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <h6>&nbsp;</h6>
                <button
                  className="btn btn-dark btn-block"
                  type="button"
                  onClick={() => this.handleOnRollPlayerPrimaryStat()}
                >
                  <i className="fas fa-dice-d20"></i> Roll Primary Stat
                </button>
              </div>
              {this.props.newPlayer.Stats.filter((s) => s.type == "core").map(
                (s) => (
                  <div className="col-2">
                    <h6>{s.stat.toUpperCase()}</h6>
                    <input
                      data-name={s.stat}
                      className="form-control"
                      type="number"
                      min="1"
                      max="3"
                      value={s.value == 0 ? "" : s.value}
                      placeholder={s.stat}
                      onChange={(e) => this.handleNewPlayerStatChanged(e)}
                    />
                  </div>
                )
              )}
            </div>
            <div className="row mt-5">
              <div className="col">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => this.handleAddCharacter()}
                >
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  &nbsp;Add Character
                </button>
              </div>
            </div>
          </div>
        </div>
        <TitleBlock title="CHARACTER SELECTION" />

        <div className="row mt-4">
          {this.props.players.map((player) => (
            <div key={player.name} className="col-md-6 col-lg-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-2">{player.name}</h4>
                  <p>
                    <span className="modesto">Role: </span>
                    <span>{player.role}</span>
                  </p>
                  <p>
                    <span className="modesto">Goal: </span>
                    <span>{player.goal}</span>
                  </p>
                  <p>
                    <span className="modesto">Descriptor: </span>
                    <span>{player.descriptor}</span>
                  </p>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <HashRouter basename="/">
                        <Link
                          to="/stats"
                          className="btn btn-dark btn-block"
                          onClick={() => this.props.onPlayerSelect(player.name)}
                        >
                          <i
                            className="fas fa-user-plus"
                            aria-hidden="true"
                          ></i>
                          &nbsp;Select
                        </Link>
                      </HashRouter>
                      {/* <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.onPlayerSelect(player.name)}
                      >
                        <i className="fas fa-user-plus" aria-hidden="true"></i>
                        &nbsp;Select
                      </button> */}
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => this.handlePlayerDelete(player.name)}
                      >
                        <i className="fas fa-times" aria-hidden="true"></i>
                        &nbsp;Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Characters;
