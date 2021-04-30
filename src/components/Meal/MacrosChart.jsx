import React from 'react';

function MacrosChart({ meal }) {
    
    //console.log('mealMacros', meal)
    return (
        <div className="MacrosChart">
            <table>
                <tbody>
                    <tr className="text-align-center">
                    <td>Fats</td>
                    <td>20 50 g</td>
                    </tr>
                    <tr>
                    <td>Proteins</td>
                    <td>20/50 g</td>
                    </tr>
                    <tr>
                    <td>Carbs</td>
                    <td>20/50 g</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MacrosChart;