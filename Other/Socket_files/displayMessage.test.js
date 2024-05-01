test('displayMessage should display an error if the message is too long', () => {
    const io = { emit: jest.fn() }; // mock the 'io' object
    const message = 'This message is definitely longer than twenty characters';
    const id = 123;
  
    // Mock the console.error function
    console.error = jest.fn();
  
    displayMessage(io, message, id);
  
    // Check if an error was displayed
    expect(console.error).toHaveBeenCalledWith('Error: Message is too long');
  
    // Check if the message was not emitted
    expect(io.emit).not.toHaveBeenCalled();
  });
  