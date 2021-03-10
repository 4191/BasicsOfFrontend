const obj1 = {
    a: 100,
    b: {
        x: 100,
        y: 200,
    },
};

const obj2 = {
    a: 100,
    b: {
        x: 100,
        y: 200,
    },
};

const isEqual = (p1, p2) => {
    let p1Type = typeof p1;
    let p2Type = typeof p2;
    if (p1Type !== p2Type) {
        return false;
    } else {
        if (p1Type !== 'object') {
            return p1 === p2;
        } else {
            for (let curKey in p1) {
                return isEqual(p1[curKey], p2[curKey]);
            }
        }
    }
};
// console.log(isEqual(obj1, obj2));

// function Parent() {
//     this.name = 'parent'
//     this.type = 'p'
// }

// Parent.prototype.say = () => {
//     console.log('say');

// }

// function Child() {
//     Parent.call(this)
//     this.tag = 'children'
// }
// var parent = new Parent()
// var child = new Child()

// parent.say()
// child.say()


// function Parent() {
//     this.name = 'parent'
//     this.play = [1, 2, 3]
// }

// function Child() {
//     Parent.call(this)
//     this.type = 'child'
// }

// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child
// console.log(new Child().name)

// var s1 = new Child()
// var s2 = new Child()
// s1.play.push(4)
// console.log(s1.play, s2.play)


//数组降维
function flat(arr, result = []) {
    if (arr instanceof Array) {
        for (let cur of arr) {
            flat(cur, result)
        }
    } else {
        result.push(arr)
    }
    return result
}

// console.log(flat([
//     [
//         [1, 7], 2, 6
//     ], 3, 4, 5
// ]))

function deDuplication(arr) {
    let map = {}
    arr.forEach(cur => {
        if (!map[cur]) {
            map[cur] = true
        }
    })
    return Object.keys(map)
}

console.log(deDuplication([1, 2, 2, 3, 3, 2, 1, 4, 5, 5, 6]))