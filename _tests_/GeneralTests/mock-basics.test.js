

describe("basic mock examples", () => {
    test("mock impleentation", () => {
        const mock = jest.fn(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("also mock implementation",() => {
        const mock = jest.fn().mockImplementation(()=>"bar");

        expect (mock("foo")).toBe("bar");
        expect (mock).toHaveBeenCalledWith("foo");
    });

    test("mock implementation one time", () => {
        const mock = jest.fn().mockImplementationOnce(() => "bar");
      
        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
      
        expect(mock("baz")).toBe(undefined);
        expect(mock).toHaveBeenCalledWith("baz");
      });
      
      test("mock return value",() => {
          const mock = jest.fn();
          mock.mockReturnValue("bar");

          expect(mock("foo")).toBe("bar");
          expect(mock).toHaveBeenCalledWith("foo");
      });

      test("mock promise return value",()=> {
          const mock = jest.fn();
          mock.mockResolvedValue("bar");

          expect(mock("foo")).resolves.toBe("bar");
          expect(mock).toHaveBeenCalledWith("foo");
      });

});