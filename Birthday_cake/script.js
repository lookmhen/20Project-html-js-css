// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const candles = document.querySelector(".candles");
  let audioContext; // Declare the AudioContext variable

  // Function to blow off the candle
  function blowCandle() {
    const flames = document.querySelectorAll(".flame, .flame2, .flame3");

    // Iterate over each flame element and set opacity to 0
    flames.forEach(function (flame) {
      flame.style.transition = "opacity 0.5s"; // Assuming "fast" is about 0.5 seconds
      flame.style.opacity = "0";
    });

    // Get the element with class 'text' and change opacity and top position
    const text = document.querySelector(".text");
    text.style.transition = "opacity 0.5s, top 0.5s"; // Assuming "fast" is about 0.5 seconds
    text.style.opacity = "1";
    text.style.top = "-360px";

    const text2 = document.querySelector(".text2");
    text2.style.paddingTop = "16px";
    text2.style.fontSize = "1rem";
    text2.innerHTML =
    "สุขสันวันเกิดย้อนหลังนะฮะขออภัยทำให้สำเร็จช้าไปหน่อยก็ มีความสุขสมหวังไม่เจ็บไม่ป่วยชีวิตสดใสเหมือนหน้านะอิอิและก็ได้งานอย่างที่ตั้งใจไวๆแกหลังจากนี้ไม่ได้เจอกันแล้วเศร้าเหมือนกันนะใจจริงก็ยังไม่อยากไปจากที่นี่เลยอยากเฮฮากันเหมือนเดิมเวลามีซีรีย์อะไรก็มาแนะนำกันไรงี้ 555 เหงาแหละดูออก ตรูเนี่ย ก็ สุขสันต์วันเกิดอีกรอบจ้า ♥♥♥";

    // Change the background color of the body
    document.body.style.transition = "background-color 0.5s";
    document.body.style.backgroundColor = "#000";

    document.removeEventListener("click", createAudioContext);
  }

  // function updateFlamePosition(volume) {
  //   const maxTranslation = 10; // Maximum translation in pixels
  //   const translation = volume / 255 * maxTranslation; // Adjust translation based on volume

  //   flame.style.transform = `translateX(-50%) translateY(${translation}px)`;
  // }

  // // Function to update volume bar
  // function updateVolumeBar(height) {
  //   volumeBar.style.height = `${height}px`;
  // }

  // Function to create AudioContext
  function createAudioContext() {
    const text2 = document.querySelector(".text2");
    text2.innerHTML = "อธิฐานแล้วเป่าเทียนได้เลยจ้า";
    // สร้าง AudioContext ใหม่ โดยคำนึงถึงความเข้ากันได้ของเบราว์เซอร์
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    // สร้าง AnalyserNode จาก AudioContext
    const analyser = audioContext.createAnalyser();

    // Access the user's microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("Microphone access successful");
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        // analyser.connect(audioContext.destination);  // การเล่นเสียงออกลำโพง

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Check for blow every 100ms
        setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          const average =
            dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

          console.log("Average Sound Intensity:", average);

          // Update the volume bar based on the average sound intensity
          // updateVolumeBar(average);
          // updateFlamePosition(average);
          // If the sound intensity is above a threshold, blow the candle
          if (average > 50) {
            console.log("Blow detected!");
            blowCandle();
          }
        }, 100);
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
        alert(
          "Error accessing microphone. Please check your browser settings."
        );
      });
  }

  // Event listener for user click to create AudioContext
  document.addEventListener("click", createAudioContext);
});
