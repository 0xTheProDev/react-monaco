const c_template =
`#include <stdio.h>

int main(void) {
    /* Your Code Here */
    return 0;
}
`;

const cpp_template =
`#include <iostream>
using namespace std;

int main() {
    // Your Code Here
    return 0;
}
`;

const java_template =
`import java.io.*;

class Molan {
    public static void main (String[] args) {
        // Your Codes Here
    }
}
`;

const py_template =
`# Write Codes Here
`;

export default {
  'c': c_template,
  'cpp': cpp_template,
  'java': java_template,
  'python': py_template,
};
