# Database Diagram Documentation

## Overview
This document describes the database schema for the DII project using the **dbdiagram.io** DSL. It is intended as a single source of truth for the logical data model and relationships between tables.

## Purpose
- Provide a human-readable description of the database structure.
- Keep the application team and database team aligned on schema changes.
- Serve as the input file for generating visual ERD diagrams via dbdiagram.io.

## How to Use This File
1. Copy the DSL code in the `DB Diagram Definition` section below.
2. Go to https://dbdiagram.io/ and create or open your project.
3. Paste the DSL code into the editor.
4. Review the generated diagram and adjust as needed.
5. When you change the schema:
   - Update this file first.
   - Regenerate/update the diagram in dbdiagram.io using the updated DSL.

> Online diagram for this schema is also available here: https://dbdiagram.io/d/DII-Test-RBAC-6939448ee877c6307442f76d

## Conventions
- Table names use `snake_case`.
- Primary keys are named `id` unless a different convention is required.
- Foreign keys follow the pattern `<referenced_table>_id`.
- Timestamps use `created_at` and `updated_at` when applicable.

## DB Diagram Definition
```dbml
Table users {
  id uuid [primary key]
  full_name varchar(100)
  username varchar(50) [unique]
  email varchar(100) [unique]
  password_hash varchar(100)
  created_at datetime [default: `now()`]
  updated_at datetime
  deleted_at datetime
}


Table user_roles {
  id uuid [primary key]
  user_id uuid [ref: > users.id]
  role_id uuid [ref: > roles.id]

  indexes {
    (user_id, role_id) [unique]
    (user_id)
    (role_id)
  }
}


Table roles {
  id uuid [primary key]
  name varchar(100)
  description text
  created_at datetime [default: `now()`]
  updated_at datetime
  deleted_at datetime
}


Table role_menus {
  id uuid [primary key]
  role_id uuid [ref: > roles.id]
  menu_id uuid [ref: > menus.id]

  indexes {
    (role_id, menu_id) [unique]
    (role_id)
    (menu_id)
  }
}


Table menus {
  id uuid [primary key]
  name varchar(100)
  url varchar(100)
  parent_id uuid [ref: > menus.id ]
  created_at datetime [default: `now()`]
  updated_at datetime
  deleted_at datetime

  indexes {
    (parent_id)
  }
}
```

## Change Log
- Initial version: Created dbdiagram documentation template.
