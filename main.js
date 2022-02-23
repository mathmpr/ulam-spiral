document.addEventListener('DOMContentLoaded', function () {

    let ulam = document.getElementById("ulam-spiral");

    // size of canvas
    let size = 500;

    ulam.width = size;
    ulam.height = size;

    let ctx = ulam.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;

    let x = (size / 2);
    let y = size / 2;

    let frame_rate = 120;
    let number_of_object_in_single_row = 50;

    let object_size = size / number_of_object_in_single_row;

    let num = 1;
    let step = 1;
    let state = 0;
    let turn = 0;
    let current_number = 1;

    let object_real_size = object_size / 4;

    let isPrime = (value) => {
        if (value === 1) return false;
        for (let i = 2; i < value; i++) {
            if (value % i === 0) return false;
        }
        return true;
    }

    let begin = true;
    let draw = () => {

        if (!begin) {
            begin = true;
            ctx.lineTo(x - object_real_size / 4, y - object_real_size / 4);
            ctx.stroke();
        }

        if (isPrime(current_number)) {
            ctx.beginPath();
            ctx.arc(x - object_real_size / 4, y - object_real_size / 4, object_real_size, 0, 2 * Math.PI, false);
            ctx.fill();
        }

        if (begin) {
            begin = false;
            ctx.beginPath();
            ctx.moveTo(x - object_real_size / 4, y - object_real_size / 4);
        }

        current_number++;

    }

    let frame = () => {
        if ((x + object_real_size) <= size && (y + object_real_size) <= size) {

            setTimeout(() => {

                draw();

                switch (state) {
                    case 0:
                        x += object_size;
                        break;
                    case 1:
                        y -= object_size;
                        break;
                    case 2:
                        x -= object_size;
                        break;
                    case 3:
                        y += object_size;
                        break;
                }

                if (step % num === 0) {
                    state = (state + 1) % 4;
                    turn++;
                    if (turn % 2 === 0) {
                        num++;
                    }
                }
                step++;

                frame();

            }, 1000 / frame_rate);
        }
    }

    frame();

});
