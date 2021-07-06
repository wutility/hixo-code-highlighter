const langsTest = {
  javascript: {
    code: `// hello world
/*
this is a multi comments
*/
class Test {
  constructor() {
    this.timeV += false
    this.timeV *= /^#/g
    this.NumTst = 1a23
  }

  private methodText() {
    this.methodName = "hello world = 1"
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
  }
}

for (let i = 0; i < arr.length; i++) {
  console.log(i - 1 + 2 / 4 * 1254 > 10 < 22 % 52 | 44)
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
  python: {
    code: `# Return the sum of
'''Statistical median to demonstrate doctest.
  >>> median([2, 9, 9, 7, 9, 2, 4, 5, 8])
  7
'''
def squaresum(n) : # comment
  
    # Iterate i from 1 
    # and n finding 
    # square of i and
    # add to sum.
    sm = 0
    for i in range(1, n+1) :
        sm = sm + (i * i)
      
    return sm
  
# Driven Program
n = 4
print(squaresum(n))
  
# This code is contributed by Nikita Tiwari.`},
  perl: {
    code: `#!/usr/bin/perl

use strict;
use warnings;

# first, create your message

use Email::MIME;

my $message = Email::MIME->create(

  header_str => [

    From    => 'you@example.com',

    To      => 'friend@example.com',

    Subject => 'Happy birthday!',

  ],

for( $a = 10; $a < 20; $a = $a + 1 ) {
  print "value of a: $a\n";
}

package Person;
sub new {
    my $class = shift;
    my $self = {
      _firstName => shift,
      _lastName  => shift,
      _ssn       => shift,
    };
    # Print all the values just for clarification.
    print "First Name is $self->{_firstName}";
    print "Last Name is $self->{_lastName}";
    print "SSN is $self->{_ssn}";
    bless $self, $class;
    return $self;
}`},
  java: {
    code: `import java.awt.event.ActionEvent;
import java.awt.event.ActionListener; 
/* 
  Comment here in class Node return
  <Object, Long>
  nodes.add(nodeA);
*/
public class Graph { /* Commnet */

  static Node node; // another comment
  protected String str = "hello Java";
  private Set<Node> nodes = new HashSet<Object, Long>();
  
  public void addNode(Node nodeA) {
      nodes.add(nodeA);
  }

  // getters and setters 
}`},
  csharp: {
    code: `using System;
// Create a Car class
class Car
{
  public string model;  // Create a field

  // Create a class constructor for the Car class
  public Car()
  {
    model = "Mustang"; // Set the initial value for model
  }

  static void Main(string[] args)
  {
    Car Ford = new Car();  // Create an object of the Car Class (this will call the constructor)
    Console.WriteLine(Ford.model);  // Print the value of model
  }
}

// Outputs "Mustang"`},
cpp: {
  code: `#include <iostream>
using namespace std;

class Employee {
  private:
    // Private attribute
    int salary;

  public:
    // Setter
    void setSalary(int s) {
      salary = s;
    }
    // Getter
    int getSalary() {
      return salary;
    }
};

int main() {
  Employee myObj;
  myObj.setSalary(50000);
  cout << myObj.getSalary();
  return 0;
}`},
  php: {
    code: `<?php
class Fruit {
  // Properties
  public $name = " color $po";
  public $color = 1235;

  // Methods
  function set_name($name) {
    $this->name = $name;
  }
  function get_name() {
    return $this->name;
  }
}
?>`},
sql: {
  code: `-- Select all:
SELECT * FROM Customers;
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;`}
}