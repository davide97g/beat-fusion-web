# beat-fusion-engine

server for beat fusion analysis

## Build

- `python --version: Python 3.8.17`
- `conda --version: conda 23.3.1`
- `pip --version: pip 23.2.1`

Install dependencies with `pip install -r requirements.txt`.

## Deploy

Automatically on `main/develop` branch push, using [Heroku](https://engine.beatfusion.app)

### Freeze Requirements

```bash
pip list --format=freeze > requirements.txt
```
