export type ChartData = {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
    }[];
}

export type ChartOptions = {
    cutout: string;
    plugins: {
        legend: {
            labels: {
                color: string;
            };
        };
    };
}
