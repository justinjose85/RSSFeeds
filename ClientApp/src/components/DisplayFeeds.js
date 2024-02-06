import React, { Component } from 'react';
import './DisplayFeeds.css';

export class DisplayFeeds extends Component {
    static displayName = DisplayFeeds.name;

    constructor(props) {
        super(props);
        this.state = { receivedfeeds: [], loading: true, lastRefreshedTime: null, timeRemaining: 600 }; // 600 seconds for initial 10 minutes
    }

    componentDidMount() {
        this.populateFeedData();
        // alle 10 Minuten zu aktualisieren
        this.refreshInterval = setInterval(() => {
            this.populateFeedData();
        }, 600000);

        //die verbleibende Zeit jede Sekunde zu aktualisieren
        this.updateInterval = setInterval(() => {
            this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1 }));
        }, 1000);
    }

    // Speicherlecks zu verhindern
    componentWillUnmount() {
        clearInterval(this.refreshInterval);
        clearInterval(this.updateInterval);
    }

    static renderFeedsTable(receivedfeeds) {
        // Sortieren receivedfeeds durch publishedDate
        receivedfeeds.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

        return (
            //Table für Feeds
            <table className="feeds-table" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Schlagzeilen</th>
                        <th>Beschreibung</th>
                        <th>Veroeffentlichungsdatum</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedfeeds.map(receivedfeed => (
                        <tr key={receivedfeed.title}>
                            <td style={{ maxWidth: "600px", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <a href={receivedfeed.link} target="_blank" rel="noopener noreferrer" title={receivedfeed.link}>
                                    {receivedfeed.title}
                                </a>
                            </td>
                            <td style={{ maxWidth: "600px", overflow: "hidden", textOverflow: "ellipsis" }}> {receivedfeed.description}</td>
                            <td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}> {new Date(receivedfeed.publishedDate).toLocaleString('de-DE')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : (
                <div>
                    {DisplayFeeds.renderFeedsTable(this.state.receivedfeeds)}
                </div>
            );

        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;

        return (
            <div className="display-feeds-container">
                <h1 className="table-label">tagesschau RSS Feeds</h1>
                <p className="description">Diese Komponente ruft Daten aus dem <a href='https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml' target="_blank" rel="noopener noreferrer">tagesschau RSS feed</a> ab, um aktuelle Nachrichten anzuzeigen.</p>
                <p className="last-refreshed-time">Letzte Aktualisierung: {this.state.lastRefreshedTime ? this.state.lastRefreshedTime.toLocaleString('de-DE') : 'Niemals'} (Aktualisierung in : {minutes}:{seconds})</p>
                {contents}
            </div>
        );
    }

    async populateFeedData() {
        const response = await fetch('rssfeed');
        const data = await response.json();
        const currentTime = new Date();
        this.setState({ receivedfeeds: data, loading: false, lastRefreshedTime: currentTime, timeRemaining: 600 }); // Verbleibende Zeit auf 10 Minuten zurücksetzen
    }
}
