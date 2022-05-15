const doAdd = (a, b, callback) => {
  // return the callback function with the result of a + b
    callback(a + b);
  };
  
  describe("mock a callback",()=> {
    test("calls callback with arguments added", () => {
      const mockCallback = jest.fn();  // mock the callback function
  
      doAdd(1, 2, mockCallback);  // call doAdd but pass in the mockCallback
      expect(mockCallback).toHaveBeenCalledWith(3);
    });
  });
  