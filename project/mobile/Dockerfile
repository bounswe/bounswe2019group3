FROM mreichelt/android:29

USER root

WORKDIR /mobile
COPY . /mobile

RUN cd bulingo && chmod +x gradlew && ./gradlew

CMD cd bulingo && ./gradlew assembleDebug && mv app/build/outputs/apk/debug/app-debug.apk app/build/outputs/apk/app.apk && rm -rf /app/build/outputs/apk/debug