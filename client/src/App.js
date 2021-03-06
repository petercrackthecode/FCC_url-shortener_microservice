import './App.css';
import { useState } from 'react';

function App() {
    const [url, setUrl] = useState('');

    return (
        <div className="app">
            <div className="container">
                <h2>API Project: URL Shortener Microservice</h2>
                <h3>User Story: </h3>
                <ol>
                    <li>
                        I can POST a URL to{' '}
                        <code>[project_url]/api/shorturl/new</code> and I will
                        receive a shortened URL in the JSON response.
                        <br />
                        Example :{' '}
                        <code>
                            {'{'}"original_url":"www.google.com","short_url":1
                            {'}'}
                        </code>
                    </li>
                    <li>
                        If I pass an invalid URL that doesn't follow the{' '}
                        <code>http(s)://www.example.com(/more/routes)</code>{' '}
                        format, the JSON response will contain an error like{' '}
                        <code>
                            {'{'}"error":"invalid URL"{'}'}
                        </code>
                        <br />
                        HINT: to be sure that the submitted url points to a
                        valid site you can use the function{' '}
                        <code>dns.lookup(host, cb)</code> from the{' '}
                        <code>dns</code> core module.
                    </li>
                    <li>
                        When I visit the shortened URL, it will redirect me to
                        my original link.
                    </li>
                </ol>

                <h3>Short URL Creation </h3>
                <p>
                    example: <code>POST [project_url]/api/shorturl/new</code> -{' '}
                    <code>https://www.google.com</code>
                </p>
                <form action="api/shorturl" method="POST">
                    <label for="url_input">URL to be shortened</label>
                    <input
                        id="url_input"
                        type="text"
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <input type="submit" value="POST URL" />
                </form>
                <h3>Example Usage:</h3>
                <a href="https://thread-paper.glitch.me/api/shorturl/3">
                    [this_project_url]/api/shorturl/3
                </a>

                <h3>Will Redirect to:</h3>
                <p>https://www.freecodecamp.org/forum/</p>
            </div>
            <div className="footer">
                <p>
                    by <a href="https://www.freecodecamp.org">freeCodeCamp</a>
                </p>
            </div>
        </div>
    );
}

export default App;
