import React from "react";
import { render, screen } from "@testing-library/react";
import StaticChart from "./StaticChart";

describe("StaticChart", () => {
  it("should render categorical/bar", () => {
    render(
      <StaticChart
        type="categorical/bar"
        options={{
          data: [["Gadget", 20], ["Widget", 31]],
          accessors: {
            x: row => row[0],
            y: row => row[1],
          },
          settings: {
            y: {
              number_style: "currency",
              currency: "USD",
              currency_style: "symbol",
            },
          },
          labels: {
            left: "Count",
            bottom: "Category",
          },
        }}
      />,
    );

    screen.getByText("Gadget");
    screen.getByText("Widget");
    screen.getAllByText("Count");
    screen.getAllByText("Category");
  });

  it("should render categorical/donut", () => {
    render(
      <StaticChart
        type="categorical/donut"
        options={{
          data: [["donut", 20], ["cronut", 31]],
          colors: {
            donut: "#509EE3",
            cronut: "#DDECFA",
          },
          accessors: {
            dimension: row => row[0],
            metric: row => row[1],
          },
        }}
      />,
    );
  });

  it("should render timeseries/bar", () => {
    render(
      <StaticChart
        type="timeseries/bar"
        options={{
          data: [["2010-11-07", 20], ["2020-11-08", 30]],
          accessors: {
            x: row => new Date(row[0]).valueOf(),
            y: row => row[1],
          },
          settings: {
            x: {
              date_style: "dddd",
            },
          },
          labels: {
            left: "Count",
            bottom: "Time",
          },
        }}
      />,
    );

    screen.getAllByText("Count");
    screen.getAllByText("Time");
  });

  it("should render timeseries/line", () => {
    render(
      <StaticChart
        type="timeseries/line"
        options={{
          data: [["2010-11-07", 20], ["2020-11-08", 30]],
          accessors: {
            x: row => new Date(row[0]).valueOf(),
            y: row => row[1],
          },
          settings: {
            x: {
              date_style: "dddd",
            },
          },
          labels: {
            left: "Count",
            bottom: "Time",
          },
        }}
      />,
    );

    screen.getAllByText("Count");
    screen.getAllByText("Time");
  });

  it("should render timeseries/area", () => {
    render(
      <StaticChart
        type="timeseries/area"
        options={{
          data: [["2010-11-07", 20], ["2020-11-08", 30]],
          accessors: {
            x: row => new Date(row[0]).valueOf(),
            y: row => row[1],
          },
          settings: {
            x: {
              date_style: "MMM",
            },
          },
          labels: {
            left: "Count",
            bottom: "Time",
          },
        }}
      />,
    );

    screen.getAllByText("Count");
    screen.getAllByText("Time");
  });
});
