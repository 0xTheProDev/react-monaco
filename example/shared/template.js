const cTemplate =
`#include <stdio.h>

int main(void) {
    /* Your Code Here */
    return 0;
}
`;

const cppTemplate =
`#include <iostream>
using namespace std;

int main() {
    // Your Code Here
    return 0;
}
`;

const javaTemplate =
`import java.io.*;

class Molan {
    public static void main (String[] args) {
        // Your Codes Here
    }
}
`;

const pyTemplate =
`# Write Codes Here
`;

export default {
  'c': cTemplate,
  'cpp': cppTemplate,
  'java': javaTemplate,
  'python': pyTemplate,
};
