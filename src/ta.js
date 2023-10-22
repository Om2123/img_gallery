// The examples below show you how to write function accum:

// Examples:
// accum("abcd") -> "A-Bb-Ccc-Dddd"
// accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// accum("cwAt") -> "C-Ww-Aaa-Tttt"
// The parameter of accum is a string which includes only letters from a..z and A..Z.

function accum(s) {
  let ans = "",
    d = "-";
  for (var i = 0; i < s.length; i++) {
    let a = s[i];

    let temp = a.toUpperCase();
    for (var j = 0; j < i; j++) {
      //   if (j != 0) a = a.toUpperCase();
      // a.toUpperCase();
      temp += a;
      //   console.log(temp);
    }
    if (i != s.length - 1) temp += d;
    ans += temp;
  }
  console.log(ans);
}
accum("abcd");
