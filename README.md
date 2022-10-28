# resolume-controller

## Table of Contents
  1. [Introduction](#introduction)
  2. [Variables](#variables)
  3. [Functions](#functions)
  

## Introduction

Software engineering principles, from Robert C. Martin's book
[*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882),
adapted for Julia. This is not a style guide. It's a guide to producing
readable, reusable, and refactorable software in Julia.

Not every principle herein has to be strictly followed, and even fewer will be universally 
agreed upon. These are guidelines and nothing more, but they are ones codified over many 
years of collective experience by the authors of *Clean Code*.

Inspired from [clean-code-python](https://github.com/zedr/clean-code-python)

Targets Julia 1.3.1

## **Variables**
### Use meaningful and pronounceable variable names

**Bad:**
```julia
ymdstr = Dates.format(now(), "yyyy-mm-dd")
```

**Good**:
```julia
current_date = Dates.format(now(), "yyyy-mm-dd")
```
**[⬆ back to top](#table-of-contents)**

### Use the same vocabulary for the same type of variable

**Bad:**
Here we use three different names for the same underlying entity:
```julia
get_user_info()
get_client_data()
get_customer_record()
```

**Good**:
If the entity is the same, you should be consistent in referring to it in your functions:
```julia
get_user_info()
get_user_data()
get_user_record()
```

**Even better**
Julia has multiple dispatch. If it makes sense, package the related data together in a struct and 
define functions are called with this struct.

```julia
struct User
    foo::String
    bar::Int
end

get_info(user::User)
get_data(user::User)
get_record(user::User)
```

**[⬆ back to top](#table-of-contents)**

