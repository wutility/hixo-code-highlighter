const langsTest = {
  plaintext: {
    code: `# Why choosing Hixo SYNTAX HIGHLIGHTER?

Extensible.
Simple.
Lightweight < 2KB.
Fast compared with others syntax highlighters.
Written in Javascript.
Zero dependencies.`},
  yaml: {
    code: `[default]
# Employee records
- martin:
    name: Martin D'vloper
    job: Developer
    skills:
      - python [default]
      - perl { df }
      - pascal
- tabitha:
    name: Tabitha Bitumen
    job: Developer
    skills:
      - lisp
      - fortran
      - erlang
      
foo: "{{ variable }}/additional/string/literal"
foo2: "{{ variable }}\\backslashes\\are\\also\\special\\characters"
foo3: "even if it's just a string literal it must all be quoted"`
  },
  javascript: {
    code: `import { somthing } from '../somthing/index.js'
// hello world
/*
this is a multi comments
*/
const me = () => [1, 2, 0x15, '488', "87 //"]
class Test {
  obj = { name:'miky', num:1 }
  constructor() {
    this.timeV += false
    this.timeV *= /^#/g
    this.NumTst = text.replace(/^#/g, "_")    
  }

  private methodText() {
    if(this.methodName === "hello world = 1" && 7 >= 1 || v <= 1){
    }
    else const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
  }
}

for (let i = 0; i < arr.length; i++) {
  console.log(i - 1 + 2 / 4 * 1254 > 10 < 22 % 52 | 44)
  i--
  j /= 4
  let v << undefined
  let k >> null
  return 'hello'
}
// try catch block
try {
  while(true) {
    continue
    break
  }
  console.log('ok', "152 dfdf")
  method.call(vv, 1000)
}
catch(Exception e) {

}`},
  go: {
    code: `package animals

import "fmt"

func sum(s []int, c chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  c <- sum // send sum to c
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}

  c := make(chan int)
  go sum(s[:len(s)/2], c)
  go sum(s[len(s)/2:], c)
  x, y := <-c, <-c // receive from c

  fmt.Println(x, y, x+y)
}

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(true ? 1 : 0)
}`},
  rust: {
    code: `// Unlike C/C++, there's no restriction on the order of function definitions
fn main() {
  fizzbuzz_to(100);
}

// Function that returns a boolean value
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
  // Corner case, early return
  if rhs == 0 {
      return false;
  }

  lhs % rhs == 0
}

fn fizzbuzz(n: u32) -> () {
  if is_divisible_by(n, 15) {
      println!("fizzbuzz");
  } else if is_divisible_by(n, 3) {
      println!("fizz");
  } else if is_divisible_by(n, 5) {
      println!("buzz");
  } else {
      println!("{}", n);
  }
}

// When a function returns (), the return type can be omitted from the
fn fizzbuzz_to(n: u32) {
  for n in 1..n + 1 {
      fizzbuzz(n);
  }
}`},
  python: {
    code: `# Return the sum of
'''
Statistical median to demonstrate doctest.
>>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])
7
'''
def squaresum(n) : # comment
  print('https://000hello.com')
  # Iterate i from 1 //
  sm = 0
  for i in range(1, n+1) :
      sm = sm + (i * i)
    
  return sm
  
# Driven Program
n = 4
print(squaresum(n))`},
  java: {
    code: `import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; 
/* 
  Comment here in class Node return
  <Object, Long>
  nodes.add(nodeA);
*/
@Entity
public class Graph { /* Commnet */

  static Node node; // another comment
  protected String str = "hello Java";
  private Set<Node> nodes = new HashSet<Object, Long>();
  
  @GetMapping('/url')
  public void addNode(Node nodeA) {
      nodes.add(nodeA);
  }

  // getters and setters 
}`},
  csharp: {
    code: `using System;
// Declare the generic class.
public class GenericList<T>
{
  public void Add(T input) { }
}

class TestGenericList
{
  private class ExampleClass { }
  static void Main()
  {
    // Declare a list of type int.
    GenericList<int> list1 = new GenericList<int>();
    list1.Add(1);

    // Declare a list of type string.
    GenericList<string> list2 = new GenericList<string>();
    list2.Add("");

    // Declare a list of type ExampleClass.
    GenericList<ExampleClass> list3 = new GenericList<ExampleClass>();
    list3.Add(new ExampleClass());
  }
}`},
  cpp: {
    code: `#include <iostream>
using namespace std;

struct student
{
  char name[50];
  int roll;
  float marks;
} s[10];

int main()
{
  cout << "Enter information of students: " << endl;

  // storing information
  for(int i = 0; i < 10; ++i)
  {
      s[i].roll = i+1;
      cout << "For roll number" << s[i].roll << "," << endl;

      cout << "Enter name: ";
      cin >> s[i].name;

      cout << "Enter marks: ";
      cin >> s[i].marks;

      cout << endl;
  }

  cout << "Displaying Information: " << endl;

  // Displaying information
  for(int i = 0; i < 10; ++i)
  {
      cout << "\nRoll number: " << i+1 << endl;
      cout << "Name: " << s[i].name << endl;
      cout << "Marks: " << s[i].marks << endl;
  }

  return 0;
}
`},
  php: {
    code: `<?php declare(strict_types=1);

define('ROOT_DIR', dirname(__DIR__));

require ROOT_DIR . '/vendor/autoload.php';

\Tracy\Debugger::enable();

$routeInfo = $dispatcher->dispatch( # comment
  $request->getMethod(),
  $request->getPathInfo()
);

switch ($routeInfo[0]) {
  case \FastRoute\Dispatcher::NOT_FOUND:
    $response = new \Symfony\Component\HttpFoundation\Response(
        'Not found',
        404
    );
    break;
  case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $response = new \Symfony\Component\HttpFoundation\Response(
        'Method not allowed',
        405
    );
    break;
  case \FastRoute\Dispatcher::FOUND:    
    $vars = $routeInfo[2];
    $injector = include('Dependencies.php');
    break;
}

if (!$response instanceof \Symfony\Component\HttpFoundation\Response) {
  throw new \Exception('Controller methods must return a Response object');
}

$response->prepare($request);
$response->send();`},
  sql: {
    code: `-- Select all:
SELECT * FROM Customers;
SELECT column_name(s)
FROM table1 -- comment
RIGHT JOIN table2
ON table1.column_name = table2.column_name
WHERE column_name BETWEEN value1 AND value2;

CREATE TABLE Persons ( /* comment */
  ID int NOT NULL UNIQUE,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Age int
);
/*
  comment
*/
delete from persons
update persons set name= 'hello'

EXCEPTION 
  -- Exception-handling-statements 
END;`},
  plsql: {
    code: `DECLARE  
  total_rows number(2); 
BEGIN 
  UPDATE customers 
  SET salary = salary + 500; 
  IF sql%notfound THEN 
     dbms_output.put_line('no customers selected'); 
  ELSIF sql%found THEN 
     total_rows := sql%rowcount;
     dbms_output.put_line( total_rows || ' customers selected '); 
  END IF;  
END; 
/`}
}