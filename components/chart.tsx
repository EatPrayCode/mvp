import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import BasicTable from './table';

export function ChartContainer(props: any) {
    const chartData = props.chartData;
    const chartType = props.chartType;
    const chartTitle = props.chartTitle;
    return (
        <React.Fragment>
            {/* <div>{chartTitle} : {chartType}</div> */}
            {chartType === 'BAR' &&
                <div className="chart">
                    <Bar
                        data={chartData}
                        options={{
                            title: {
                                display: true,
                                text: chartTitle,
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                        }}
                    />
                </div>
            }
            {chartType === 'LINE' &&
                <div className="chart">
                    <Line
                        data={chartData}
                        options={{
                            title: {
                                display: true,
                                text: chartTitle,
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                        }}
                    />
                </div>
            }
            {chartType === 'PIE' &&
                <div className="chart">
                    <Pie
                        data={chartData}
                        options={{
                            title: {
                                display: true,
                                text: chartTitle,
                                fontSize: 25
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                        }}
                    />
                </div>
            }
            {chartType === 'TABLE' &&
                <BasicTable chartTitle={chartTitle}/>
            }
        </React.Fragment>
    );
}
