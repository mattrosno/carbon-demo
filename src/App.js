import React, { Component } from "react";
import Search20 from "@carbon/icons-react/es/search/20";
import Cart20 from "@carbon/icons-react/es/shopping--cart/20";
import { Button, DataTable, Tile } from "carbon-components-react";
import {
  Content,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent
} from "carbon-components-react/lib/components/UIShell";
import Ingredients from "./ingredients";

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow
} = DataTable;

const headers = [
  {
    key: "ingredient",
    header: "Ingredient"
  },
  {
    key: "type",
    header: "Type"
  },
  {
    key: "calories",
    header: "Calories"
  },
  {
    key: "fat",
    header: "Fat"
  },
  {
    key: "protein",
    header: "Protein"
  },
  {
    key: "carbs",
    header: "Carbs"
  }
];

// const rows = [
//   {
//     id: "1",
//     ingredient: "Flour Tortilla",
//     type: "Tortilla",
//     calories: "320",
//     fat: "9",
//     protein: "8",
//     carbs: "50"
//   },
//   {
//     id: "2",
//     ingredient: "Chicken",
//     type: "Filling",
//     calories: "170",
//     fat: "7",
//     protein: "24",
//     carbs: "2"
//   }
// ];

class App extends Component {
  constructor(props) {
    super(props);

    this.ingredients = Ingredients();

    this.state = {
      calories: 0,
      fat: {
        calories: 0,
        percentage: 0
      },
      protein: {
        calories: 0,
        percentage: 0
      },
      carbs: {
        calories: 0,
        percentage: 0
      }
    };
  }

  handleSelection(selectedRows) {
    let totalCalories = 0;
    let fatCalories = 0;
    let proteinCalories = 0;
    let carbCalories = 0;

    for (var row of selectedRows) {
      totalCalories += row.cells[2].value;
      fatCalories += row.cells[3].value;
      proteinCalories += row.cells[4].value;
      carbCalories += row.cells[5].value;
    }

    const totalMacros = fatCalories + proteinCalories + carbCalories;

    this.setState({
      calories: totalCalories,
      fat: {
        calories: fatCalories,
        percentage: totalMacros
          ? ((fatCalories / totalMacros) * 100).toFixed()
          : 0
      },
      protein: {
        calories: proteinCalories,
        percentage: totalMacros
          ? ((proteinCalories / totalMacros) * 100).toFixed()
          : 0
      },
      carbs: {
        calories: carbCalories,
        percentage: totalMacros
          ? ((carbCalories / totalMacros) * 100).toFixed()
          : 0
      }
    });
  }

  render() {
    return (
      <div>
        <Header aria-label="Austin Tacos">
          <SkipToContent />
          <HeaderName href="#" prefix="IBM">
            Tacos
          </HeaderName>
          <HeaderNavigation aria-label="Austin Tacos">
            <HeaderMenuItem href="#">Locations</HeaderMenuItem>
            <HeaderMenuItem href="#">Menu</HeaderMenuItem>
            <HeaderMenuItem href="#">Ingredients</HeaderMenuItem>
            <HeaderMenuItem href="#">Our Story</HeaderMenuItem>
            <HeaderMenuItem href="#">News</HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search">
              <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Cart">
              <Cart20 />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <Content id="main-content">
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col">
                <h1 className="demo--heading">Build your own taco</h1>
                <h2 className="demo--subheading">Nutritional totals</h2>
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col demo--col-bleed">
                <Tile>
                  <h3 className="demo--label">Calories</h3>
                  <p className="demo--value">{this.state.calories}</p>
                </Tile>
              </div>
              <div className="bx--col demo--col-bleed">
                <Tile>
                  <h3 className="demo--label">Fat</h3>
                  <p className="demo--value">
                    {this.state.fat.percentage}% ({this.state.fat.calories}g)
                  </p>
                </Tile>
              </div>
              <div className="bx--col demo--col-bleed">
                <Tile>
                  <h3 className="demo--label">Protein</h3>
                  <p className="demo--value">
                    {this.state.protein.percentage}% (
                    {this.state.protein.calories}g)
                  </p>
                </Tile>
              </div>
              <div className="bx--col demo--col-bleed">
                <Tile>
                  <h3 className="demo--label">Carbs</h3>
                  <p className="demo--value">
                    {this.state.carbs.percentage}% ({this.state.carbs.calories}
                    g)
                  </p>
                </Tile>
              </div>
            </div>
            <div className="bx--row demo--row-cta">
              <div className="bx--col">
                <h2 className="demo--subheading">Choose your ingredients</h2>
              </div>
              <div className="bx--col demo--col-cta">
                <Button disabled={!this.state.calories}>Add taco</Button>
              </div>
            </div>
            <div className="bx--row demo--row-table">
              <div className="bx--col demo--col-bleed">
                <DataTable
                  rows={this.ingredients}
                  headers={headers}
                  render={({
                    rows,
                    headers,
                    getHeaderProps,
                    getSelectionProps,
                    selectedRows
                  }) => (
                    <TableContainer>
                      <Table
                        onClick={() => {
                          this.handleSelection(selectedRows);
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableSelectAll {...getSelectionProps()} />
                            {headers.map(header => (
                              <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              <TableSelectRow {...getSelectionProps({ row })} />
                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                />
              </div>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default App;
