import React from 'react';
import {Doughnut} from 'react-chartjs-2'

function TotalCalories({ meal }) {
    
    //console.log('Meal totalCalories', meal)
    
    return (
        <div className="TotalCalories">
            <Doughnut
                data={{
                    labels: ['Maximun calories', 'Calories'],
                    datasets: [{
                        labels: 'Calories',
                        data: [12, 3],
                        backgroundColor: ['green', 'grey']

                    }]
                }}
                height={200}
                weight={200}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    );
}

export default TotalCalories;