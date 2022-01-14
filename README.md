# Files difference calculator

Создано в рамках учебного проекта [Вычислитель отличий](https://ru.hexlet.io/programs/frontend/projects/46) от [Хекслет](https://ru.hexlet.io/).

### Package status:

[![Maintainability](https://api.codeclimate.com/v1/badges/d21a0f40f28b4ccc105b/maintainability)](https://codeclimate.com/github/cgehuzi/frontend-project-lvl2/maintainability)
[![Actions Status](https://github.com/cgehuzi/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/cgehuzi/frontend-project-lvl2/actions)
![ESLint](https://github.com/cgehuzi/frontend-project-lvl2/actions/workflows/eslint.yml/badge.svg)
![Jest](https://github.com/cgehuzi/frontend-project-lvl2/actions/workflows/jest.yml/badge.svg)

## Описание

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных.

**Возможности утилиты:**

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде `plain text`, `stylish` и `json`

## Установка

```bash
npm ci --production     # установка пакетов из зависимостей
npm link                # установка brain-games
```

## Запуск

```bash
gendiff file1.json file2.yml
```

## Аргументы и опции

```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```

## Форматы отчёта

Доступны 3 формата генерации отчётов:

- `stylish` (по умолчанию)
- `plain`
- `json`

Результатом работы библиотеки всегда является строка.

## Линейная структура

<details>
<summary>file1.json</summary>

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

</details>

<details>
<summary>file2.yml</summary>

```yml
timeout: 20
verbose: true
host: 'hexlet.io'
```

</details><br>

### stylish

```bash
gendiff file1.json file2.yml --format stylish
```

```txt
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### plain

```bash
gendiff file1.json file2.yml --format plain
```

```txt
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

### json

```bash
gendiff file1.json file2.yml --format json
```

```txt
[
  {
    "path": "follow",
    "status": "removed",
    "value": false
  },
  {
    "path": "proxy",
    "status": "removed",
    "value": "123.234.53.22"
  },
  {
    "path": "timeout",
    "status": "updated",
    "value": {
      "before": 50,
      "after": 20
    }
  },
  {
    "path": "verbose",
    "status": "added",
    "value": true
  }
]
```

## Вложенная структура

<details>
<summary>file1.json</summary>

```json
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

</details>

<details>
<summary>file2.yml</summary>

```yml
common:
  follow: false
  setting1: 'Value 1'
  setting3: null
  setting4: 'blah blah'
  setting5:
    key5: 'value5'
  setting6:
    key: 'value'
    ops: 'vops'
    doge:
      wow: 'so much'
group1:
  foo: 'bar'
  baz: 'bars'
  nest: 'str'
group3:
  deep:
    id:
      number: 45
  fee: 100500
```

</details><br>

### stylish

```bash
gendiff file1.json file2.yml --format stylish
```

```txt
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

### plain

```bash
gendiff file1.json file2.yml --format plain
```

```txt
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### json

```bash
gendiff file1.json file2.yml --format json
```

```txt
[
  {
    "path": "common.follow",
    "status": "added",
    "value": false
  },
  {
    "path": "common.setting2",
    "status": "removed",
    "value": 200
  },
  {
    "path": "common.setting3",
    "status": "updated",
    "value": {
      "before": true,
      "after": null
    }
  },
  {
    "path": "common.setting4",
    "status": "added",
    "value": "blah blah"
  },
  {
    "path": "common.setting5",
    "status": "added",
    "value": {
      "key5": "value5"
    }
  },
  {
    "path": "common.setting6.doge.wow",
    "status": "updated",
    "value": {
      "before": "",
      "after": "so much"
    }
  },
  {
    "path": "common.setting6.ops",
    "status": "added",
    "value": "vops"
  },
  {
    "path": "group1.baz",
    "status": "updated",
    "value": {
      "before": "bas",
      "after": "bars"
    }
  },
  {
    "path": "group1.nest",
    "status": "updated",
    "value": {
      "before": {
        "key": "value"
      },
      "after": "str"
    }
  },
  {
    "path": "group2",
    "status": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "path": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]
```
