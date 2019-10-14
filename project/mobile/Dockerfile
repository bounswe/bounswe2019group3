FROM mreichelt/android:29

USER root

WORKDIR /mobile
COPY . /mobile

CMD cd bulingo && chmod +x gradlew && ./gradlew assembleDebug