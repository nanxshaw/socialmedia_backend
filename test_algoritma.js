// - inputan: [1, 2, [3, 4], 5, [6, 7], 8]
// - hasil: [1, 2, 3, 4, 5, 6, 7, 8]

//SOAL 2
function soal2 (input) {
    var output = [];
    for (let i = 0; i < input.length; i++) {
        if(Array.isArray(input[i]) == true){
            for (let i2 = 0; i2 < input[i].length; i2++) {
                output.push(input[i][i2]);
            }
        }else{
            output.push(input[i]);
        }
    }
   return output;
}

// - inputan: 5623847
// - hasil: [5000000, 600000, 20000, 3000, 800, 40, 7]

//SOAL 3
function soal3 (input) {
    var output = [];
    var arr = input.toString(10).replace(/\D/g, '0').split('').map(Number);
    for (let i = 0; i < arr.length; i++) {
        var num = (arr.length - i) - 1;
        var nol = '0'.repeat(num);
        output.push(
            arr[i] + nol
        )
    }
        return output;
}


var input_soal_2 =  [1, 2, [3, 4], 5, [6, 7], 8];
var input_soal_3 =  5623847;

console.log('SOAL 2')
console.log('INPUT = '+JSON.stringify(input_soal_2));
console.log('HASIL = '+JSON.stringify(soal2(input_soal_2)));
console.log('-------------------------------------------------------')
console.log('SOAL 3')
console.log('INPUT = '+input_soal_3);
console.log('HASIL = '+JSON.stringify(soal3(input_soal_3)));