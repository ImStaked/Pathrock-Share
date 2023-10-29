terraform {
  cloud {
    organization = "PathrockNetwork"

    workspaces {
      name = "subquery_indexer"
    }
  }
}